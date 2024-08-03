"use client";

import { useState } from 'react';
import '../app/(home)/style.css';

// 채팅 입력 박스
export default function Input({inputHandler}) {
	// 채팅 내용
	const [contents, setContents] = useState("");
	const handleInputChange = (event) => {
		setContents(event.target.value);
		console.log(contents);
	};
	// 채팅 전송
	const handleInputKeyDown = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			if (contents != "") {
				inputHandler(contents);
				// input 영역 비우기
				setContents("");
				// 벡엔드 소통
				console.log(contents);
			};
		}
	};
	const handleSendBtnClick = (event) => {
		if (contents != "") {
			inputHandler(contents);
			// input 영역 비우기
			setContents("");
			// 벡엔드 소통
			console.log(contents)
		}
	}

	return (
		<div className="background-3">
			{/* 내용입력 공간 */}
			<textarea
				className="container-5"
				value={contents}
				placeholder={"원하는 정보에 대해 말해주세요. 바로 도와드리겠습니다!"}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}>
			</textarea>
			{/* 부가 요소 공간 */}
			<div className="container-12">
					{/* 채팅 전송 버튼 */}
					<button className="button" onClick={handleSendBtnClick}>
						<img className="vector-13" src="./assets/vectors/Vector14_x2.svg" />
					</button>
					{/* <div className="button">
						<img className="vector-13" src="./assets/vectors/Vector14_x2.svg" />
					</div> */}
				
			</div>
		</div>
	);
};