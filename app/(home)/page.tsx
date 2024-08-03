"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import './style.css';
import Input from '../../components/input';
import ChatSpace from "../../components/chatspace";
import { useState } from "react";

export default function home() {
	const router = useRouter();
	const [messages, setMessages] = useState(['chat1'])
	const handleLinkClick = (event) => {
		console.log("");
		router.push(`/`)
	};
	const inputHandler = (msg) => {
		setMessages([...messages, msg]);
	};

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
				</div>
				<div className="link">
					<div className="link-icon-div">
						<img className="vector-5" src="./assets/vectors/Vector13_x2.svg" />
					</div>
					<div className="germeuny">
						germeuny
					</div>
					<div className="link-right">
						<img className="vector-6" src="./assets/vectors/Vector15_x2.svg" />
					</div>
				</div>
			</nav>

			<div className="main-container">
				<ChatSpace className="chat-container" chats={messages}/>
				<Input inputHandler={inputHandler}/>
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