export function winCalc(squares){
    const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];
    for (let i = 0; i<lines.length; i++){
        const [a, b, c] = lines[i]
        // if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        if (squares[a] === squares[b] && squares[a] === squares[c])
        {
           return squares[a]
        }
    }
    return null
}

// function concat(){
    
// }

// function checkWin(){
//     bot()
//     winCalc()
// }



// export function checkWin(){
//     // let concat
//     for (let i = 0; i<3; i++){
//       let result = concat(i, i+3, i+6)
//         if (result === 'XXX' || result === '000')
//         {
//             winCalc(i, i+3, i+6)
//         }
//     for (let i = 0; i<=6; i+=3){
//       let result = concat(i, i+1, i+2)
//         if (result === 'XXX' || result === '000')
//         {
//                   winCalc(i, i+1, i+2)
//         }
//     }
//         result concat(0,4,8)
//     if (result === 'XXX' || result === '000')
//         {
//                   winCalc(0,4,8)
//         }
//         result concat(2,4,5)
//     if (result === 'XXX' || result === '000')
//             {
//                       winCalc(2,4,6)
//             }
// }
// }
