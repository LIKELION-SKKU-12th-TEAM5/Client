"use client";

import Link from "next/link";
import './style.css';
import Input from '../../components/input';
import ChatSpace from "../../components/chatspace";
import Conv from "../../components/conv";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function home() {
	// 화면에 띄울 챗 배열
	const [messages, setMessages] = useState(['chat1']);
	// 유저 정보
	const [uuid, setUuid] = useState();
	const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [cuids, setCuids] = useState([]);
	const [currentCuid, setCurrentCuid] = useState();

	// 새로운 대화인지 여부
	const [newConv, setNewConv] = useState(true);

	// Function to create a new conversation
	const createNewConversation = async () => {
		console.log(uuid);
		try {
			const response = await fetch('/api/createConv', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ uuid }), // Pass userId or other necessary data
			});

			const data = await response.json();
			console.log(data.cuid);
			setCuids((prevCuids) => [...(prevCuids || []), data.cuid]); // Ensure prevCuids is an array
			return data.cuid;
		} catch (error) {
			console.error('Error creating new conversation:', error);
			return null;
		}
	};

	const sendChatLog = async (content, cuid) => {
		// try {
		//   await fetch('/api/chat', {
		// 	method: 'POST',
		// 	headers: {
		// 	  'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 	  cuid: 1, // Replace with actual user ID
		// 	  content,
		// 	  side: false, // Adjust according to your requirements
		// 	}),
		//   });
		//   inputHandler(content);
		// } catch (error) {
		//   console.error('Error sending chat log:', error);
		// }
		const response = await fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				cuid: cuid, // Replace with actual user ID
				content: content,
				side: false, // Adjust according to your requirements
			}),
		});

		const data = await response.json();

		return { success: true, data };
	};

	// input -> inputHandler -> chatspace
	const inputHandler = async (msg) => {
		setMessages([...messages, msg]);

		let newCuid;

		if (newConv) {
			newCuid = await createNewConversation();

			setNewConv(false);
			setCurrentCuid(newCuid);
		}

		if (newCuid) {
			await sendChatLog(msg, newCuid);
		} else {
			await sendChatLog(msg, currentCuid);
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
			setUuid(data.uuid);
			setEmail(data.email);
			setUsername(data.username);
			setCuids(data.cuid);
		} else {
			console.log(data.error);
		}
	};

	useEffect(() => {
		const authToken = Cookies.get('authToken');
		fetchUserInfo(authToken);
		setIsLogin(!!authToken);

	}, []);



	// 기존 대화 버튼 클릭 시 해당 대화로 이동(== 해당 채팅 내역 로드)
	const reloadConv = async ( cuid ) => {
		const response = await fetch(`/api/conv?cuid=${cuid}`, {method: 'GET'});
		const data = await response.json();
		console.log(data);
		setMessages(data.contents);
	}


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
					<div className="link">
						<div className="link-icon-div">
							<img className="vector-24" src="./assets/vectors/Vector6_x2.svg" />
						</div>
						<span className="link-content">
							홈
						</span>
						<div className="link-right">
							<img className="vector-25" src="./assets/vectors/Vector9_x2.svg" />
						</div>
					</div>
					<div className="link">
						<div className="link-icon-div">
							<img className="vector" src="./assets/vectors/Vector5_x2.svg" />
						</div>
						<span className="link-content">
							사용자 정보
						</span>
						<div className="link-right">
							<img className="vector-1" src="./assets/vectors/Vector3_x2.svg" />
						</div>
					</div>
				</div>
				<div className="horizontal-border">
					<div className="link">
						<div className="link-icon-div">
							<img className="vector-2" src="./assets/vectors/Vector10_x2.svg" />
						</div>
						<span className="link-content">
							저장 공고
						</span>
						<div className="link-right">
							<img className="vector-3" src="./assets/vectors/Vector4_x2.svg" />
						</div>
					</div>
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
									<Conv key={index} cuid={conv} reloadConv={reloadConv} />
								))
								:
								null
							:
							null}
					</ul>
				</div>
				{isLogin ?
					<div className="link">
						<div className="link-icon-div">
							<img className="vector-5" src="./assets/vectors/Vector13_x2.svg" />
						</div>
						<div className="germeuny">
							{username}
						</div>
						<div className="link-right">
							<img className="vector-6" src="./assets/vectors/Vector15_x2.svg" />
						</div>
					</div>
					:
					<div>
						<Link href='/login'>로그인</Link>
						<Link href='/signup'>회원가입</Link>
					</div>
				}
			</nav>

			<div className="main-container">
				<ChatSpace className="chat-container" chats={messages} />
				<Input inputHandler={inputHandler} />
				<div>자주 찾는 정책 및 지원</div>
				<div className="filter-container">
					<div className="filter-1">
						<div className="filter-des-1">
							내가 받을 수 있는<br />
							지원금/정책 불러오기
						</div>
						<div className="filter-icon-1">
							<img className="vector-17" src="./assets/vectors/Vector8_x2.svg" />
						</div>
					</div>
					<div className="background-6">
						<div className="container-8">
							청년 맞춤<br />
							주거 지원 알아보기
						</div>
						<div className="svg-10">
						</div>
					</div>
					<div className="background-7">
						<div className="container-9">
							청년 대출 상담받기
						</div>
						<div className="svg-11">
						</div>
					</div>
					<div className="background-8">
						<div className="container-10">
							청년 건강/교육 지원
						</div>
						<div className="svg-12">
							<img className="vector-18" src="./assets/vectors/Vector7_x2.svg" />
						</div>
					</div>
				</div>

			</div>
		</div >
	)
}