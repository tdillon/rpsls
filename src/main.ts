import R from 'rpsls'


let btns = [...<NodeListOf<HTMLElement>>document.querySelectorAll('i')];
let [spanWin, spanLose, spanTie] = <NodeListOf<HTMLElement>>document.querySelectorAll('span');
let result = <HTMLDivElement>document.querySelector('div');
let outcomeCSS = ['tie', 'win', 'lose'];

btns.forEach(i => i.addEventListener('click', a => {
    let p1 = +(<HTMLInputElement>(a.target)).dataset['move'];
    let p2 = Math.floor(Math.random() * 5);
    let g = R.play(p1, p2);
    let r = document.createElement('div');
    r.className = outcomeCSS[g.outcome];
    r.textContent = `${g.result}`;
    result.insertBefore(r, result.firstChild);

    switch (g.outcome) {
        case R.TIE:
            spanTie.textContent = (+spanTie.textContent + 1).toString();
            break;
        case R.PLAYER1:
            spanWin.textContent = (+spanWin.textContent + 1).toString();
            break;
        case R.PLAYER2:
            spanLose.textContent = (+spanLose.textContent + 1).toString();
    }
}));
