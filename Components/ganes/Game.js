import React, {useState} from 'react';
import "./game.css"

function Game(props) {

    const [turn, setTurn] = useState('X');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState()

    const checkClickWinner = (squares) =>{
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagnol: [
                [0, 4, 8],
                [2, 4, 6],
            ]
        }

        for (let combo in combos){
            combos[combo].forEach((pattern)=>{
                if (
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === ''
                ){
                    // do no thing
                }
                else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ){
                    setWinner(squares[pattern[0]])
                }
            })
        }

    };

    const handelClick = (num) => {

        // if (cells[num] !== 's'){
        //     alert("Allaqachon belgilangan")
        //     return
        // }

        let squares = [...cells];
        if (turn === 'X') {
            squares[num] = "X";
            setTurn("O")
        } else {
            squares[num] = "O";
            setTurn("X")
        }
        checkClickWinner(squares);
        setCells(squares)
    }

    const Cell = ({num}) => {
        return <td onClick={() => handelClick(num)}>{cells[num]}</td>
    }

    const handleRestart = ()=>{
        setWinner(null);
        setCells(Array(9).fill(''))
    }

    return (
        <>

            <div className="container">
                <table>
                    <div>
                        <h1>Turn: {turn}</h1>
                    </div>
                    <tbody>
                    <tr>
                        <Cell num={0}/>
                        <Cell num={1}/>
                        <Cell num={2}/>
                    </tr>
                    <tr>
                        <Cell num={3}/>
                        <Cell num={4}/>
                        <Cell num={5}/>
                    </tr>
                    <tr>
                        <Cell num={6}/>
                        <Cell num={7}/>
                        <Cell num={8}/>
                    </tr>
                    </tbody>
                </table>
                {winner && (
                    <>
                    <div className="winn">
                        <h1 className="winner">{winner}</h1>
                        <p className="isss">Is thi winner</p>
                    </div>
                        <button onClick={()=>handleRestart()} className="btn btn-primary">play again</button>
                    </>
                )}
            </div>
        </>
    );
}

export default Game;