// app/(home)/page.tsx
"use client";

import Link from "next/link";
import "./style.css";
import Input from "../../components/input";
import ChatSpace from "../../components/chatspace";
import Conv from "../../components/conv";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function home() {
	// 화면에 띄울 챗 배열
	const [category, setCategory] = useState('정책');
	const greetMsg = `안녕하세요! ${category} 상담 도우미 입니다! 무엇을 도와드릴까요?`
	const [messages, setMessages] = useState([{ content: greetMsg, side: true }]);
	// 유저 정보
	const [uuid, setUuid] = useState();
	const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [cuids, setCuids] = useState([]);
	const [titles, setTitles] = useState([]);
	const [currentCuid, setCurrentCuid] = useState();

	// 새로운 대화인지 여부
	const [newConv, setNewConv] = useState(true);

	// Function to create a new conversation
	const createNewConversation = async () => {

		try {
			const response = await fetch('/api/createConv', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ uuid, category }), // Pass userId or other necessary data
			});

			const data = await response.json();
			setCuids((prevCuids) => [...(prevCuids || []), data.cuid]); // Ensure prevCuids is an array
			setTitles((prevTitles) => [...(prevTitles || []), data.title]); // Ensure prevtitles is an array
			return data.cuid;
		} catch (error) {
			console.error('Error creating new conversation:', error);
			return null;
		}
	};

	const sendChatLog = async (content, cuid, side) => {
		const response = await fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				cuid: cuid, // Replace with actual user ID
				content: content,
				side: side, // Adjust according to your requirements
			}),
		});

		const data = await response.json();

		return { success: true, data };
	};

	interface ChatBotResponse {
		result: string;
	  }

	const getChatBotMsg = async (userMsg, category) => {
		let type;
		switch(category){
			case "정책":
				type = 0;
				break;
			case "주거":
				type = 1;
				break;
			case "진로":
				type = 2;
				break;
			default:
				type = null;
		}
		const response = await fetch(`https://52.78.80.132/${type}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: userMsg }),
		});		
		
		const data: ChatBotResponse = await response.json();
		return data.result;
		return `${category} 챗봇의 응답`
	};

	// input -> inputHandler -> chatspace
	const inputHandler = async (msg) => {
		let newCuid;
		const userMsg = {
			content: msg,
			side: false
		}

		if (newConv) {
			newCuid = await createNewConversation();
			setNewConv(false);
			setCurrentCuid(newCuid);

			await sendChatLog(messages[0].content, newCuid, true); // true : 챗봇
			await sendChatLog(msg, newCuid, false); // false : 사용자
			// 백엔드 소통
			const resMsg = await getChatBotMsg(msg, category);
			const chatBotMsg = {
				content: resMsg,
				side: true
			}

			setMessages([...messages, userMsg, chatBotMsg]);
			await sendChatLog(resMsg, newCuid, true);
		} else {
			await sendChatLog(msg, currentCuid, false);
			// 백엔드 소통
			const resMsg = await getChatBotMsg(msg, category);
			const chatBotMsg = {
				content: resMsg,
				side: true
			}

			setMessages([...messages, userMsg, chatBotMsg]);
			await sendChatLog(resMsg, currentCuid, true);
		}

	};

	// 로그인 여부 판단
	const [isLogin, setIsLogin] = useState(false);

	const fetchUserInfo = async (token) => {
		if (!token) {
			// console.error("No token provided for fetchUserInfo.");
			return; // Exit the function if there is no token
		}

		const response = await fetch('/api/fetchUserInfo', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		});

		const data = await response.json();

		if (response.ok) {
			setUuid(data.data.uuid);
			setEmail(data.data.email);
			setUsername(data.data.username);
			setCuids(data.data.cuids);
			setTitles(data.titles)
		} else {
			console.log(data.error);
		}
	};

	useEffect(() => {
		const authToken = Cookies.get('authToken');
		fetchUserInfo(authToken);
		setIsLogin(!!authToken);

	}, []);

	// 로그아웃
	const logoutHandler = () => {
		Cookies.remove('authToken');
		setUuid(null);
		setEmail(null);
		setUsername(null);
		setCuids([]);
		setIsLogin(false);
		setMessages([{ content: greetMsg, side: true }]);
	};

	// 기존 대화 버튼 클릭 시 해당 대화로 이동(== 해당 채팅 내역 로드)
	const reloadConv = async (cuid) => {
		setCurrentCuid(cuid);
		setNewConv(false);
		const response = await fetch(`/api/conv?cuid=${cuid}`, { method: 'GET' });
		const data = await response.json();

		setMessages(data.contents);
	}

	// 챗봇 카테고리 클릭 시 -> 채팅 초기화 및 cuid 초기화
	useEffect(() => {
		setCurrentCuid(null);
		setNewConv(true);
		setMessages([{
			content: `안녕하세요! ${category} 상담 도우미 입니다! 무엇을 도와드릴까요?`,
			side: true
		}]);
	}, [category]);

	return (
		<div className="home">
			<nav className="nav-bar">
				{/* 최상단 */}
				<div className="container-18">
					{/* 로고 */}
					<img className="container-7" src="./assets/vectors/Container_x2.svg" />
					{/* nav 바 접기 */}
					<div className="container-1">
						<img className="vector-8" src="./assets/vectors/Vector_x2.svg" />
					</div>
				</div>
				<div className="horizontal-border">
					<div className="link" onClick={() => setCategory('정책')}>
						<div className="link-icon-div">
							<img className="vector-24" src="./assets/vectors/Vector6_x2.svg" />
						</div>
						<span className="link-content">
							정책
						</span>
						<button className="link-right" onClick={() => setCategory('정책')}>
							<img className="vector-25" src="./assets/vectors/Vector9_x2.svg" />
						</button>
					</div>
					<div id="ItemTotal">
						<div className="link" onClick={() => setCategory('주거')}>
							<div className="link-icon-div">
								<img className="vector" src="./assets/vectors/Vector5_x2.svg" />
							</div>
							<span className="link-content">
								주거
							</span>
							<button className="link-right" onClick={() => setCategory('주거')}>
								<img className="vector-1" src="./assets/vectors/Vector3_x2.svg" />
							</button>
						</div>
						<div className="link" onClick={() => setCategory('진로')}>
							<div className="link-icon-div">
								<img className="vector-2" src="./assets/vectors/Vector10_x2.svg" />
							</div>
							<span className="link-content">
								진로
							</span>
							<button className="link-right" onClick={() => setCategory('진로')}>
								<img className="vector-3" src="./assets/vectors/Vector4_x2.svg" />
							</button>
						</div>
					</div>
				</div>
				{isLogin ?
					<div className="horizontal-border">
						<div className="link">
							<div className="link-icon-div">
								<img className="vector-4" src="./assets/vectors/Vector12_x2.svg" />
							</div>
							<span className="link-content">
								최근 기록
							</span>
							<div className="border">
								<span className="link-content">
									편집
								</span>
							</div>
						</div>
						<ul>
							{isLogin ?
								cuids ?
									cuids.map((conv, index) => (
										<Conv key={index} cuid={conv} title={titles[index]} reloadConv={reloadConv} />
									))
									:
									null
								:
								null}
						</ul>
					</div>
					:
					null
				}
				{isLogin ?
					<div id='logout'>
						<div className="link-icon-div">  {/* onClick -> 사용자 정보 수정 */}
							<img className="vector-5" src="./assets/vectors/Vector13_x2.svg" />
						</div>
						<div className="germeuny">
							{username}
						</div>
						<button onClick={logoutHandler}>
							로그아웃
						</button>
					</div>
					:
					<div className="divButton">
						<Link id="logIn" href='/login'>로그인</Link>
						<Link id="signUp" href='/signup'>회원가입</Link>
					</div>
				}
			</nav>

			<div className="main-container">
				<ChatSpace className="chat-container" chats={messages} category={category} setMessages={setMessages} />
				<Input inputHandler={inputHandler} />
			</div>
		</div >
	)
}