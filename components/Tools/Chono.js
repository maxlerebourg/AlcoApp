import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';

const View = styled.View`
	${props => props.isRow && 'flex-direction: row'};
	width: 100%;
	justify-content: space-between;
	align-items: center;
`;
const TouchableOpacity = styled.TouchableOpacity`
	background: ${props => props.theme.red2};
	justify-content: center;
	align-items: center;
	padding: 10px;
	margin-top: 10px;
	${props => !props.isRaz && `
		width: 70px;
	`}
`;
const Text = styled.Text`
	color: ${props => props.theme[props.isTime ? 'greyTitle' : 'white']};
	font-size: ${props => props.isTime ? 20 : 16}px;
	font-weight: bold;
`;

function Chrono (){
	const [millis, setMillis] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const interval = useRef(null);

	useEffect(() => {
		clearInterval(interval.current);
		return () => clearInterval(interval.current);
	}, []);



	const tick = () => {
		setMillis(milli => {
			let nextMilli = milli + 1;
			if (nextMilli >= 10) {
				setSeconds(second => {
					let nextSecond = second + 1;
					if (nextSecond >= 60) {
						setMillis(0);
						setMinutes(minute => minute + 1);
						return 0;
					}
					return nextSecond;
				});
				return 0;
			}
			return nextMilli;
		})
	};

	const start = () => {
		interval.current = setInterval(tick, 100);
	};
	const stop = () => {
		clearInterval(interval.current);
	};
	const raz = () => {
		setMillis(0);
		setSeconds(0);
		setMinutes(0);
	};

	return (
		<View>
			<Text isTime>
				{`${minutes.toString().padStart(2,'0')}'${seconds.toString().padStart(2,'0')}"${millis.toString().padStart(2,'0')}`}
			</Text>
			<View isRow>
				<TouchableOpacity onPress={start}>
					<Text>Start</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={raz}>
					<Text>RAZ</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={stop}>
					<Text>Stop</Text>
				</TouchableOpacity>
			</View>
			</View>
	)
}

export default Chrono;