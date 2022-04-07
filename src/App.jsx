import React from "react";
import GridItem from "./GridItem";
import "./style.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      player: 0,
      count: 0,
      rows: [0, 0, 0],
      cols: [0, 0, 0],
      diag: 0,
      anti_diagonal: 0,
      player1: [],
      player2: [],
      colorMap: new Map(),
      message: "Who will be the winner?",
    };
  }
  playerClicked = async (i, j, id) => {
    // debugger;
    if (!this.state.player1.includes(id) && !this.state.player2.includes(id)) {
      await this.setState({
        count: this.state.count + 1,
      });
      await this.setState({
        player: this.state.count % 2 === 1 ? 1 : -1,
      });

      //save the color css in the pair of id-player
      let copiedMap = new Map(this.state.colorMap);
      copiedMap.set(id, this.state.player === 1 ? "player1" : "player2");
      this.setState({ colorMap: copiedMap });

      // defined the clicked grid belongs to which player
      if (this.state.player === 1) {
        this.setState({ player1: [...this.state.player1, id] });
      } else if (this.state.player === -1) {
        this.setState({ player2: [...this.state.player2, id] });
      }

      //record the players' steps
      let copiedRow = [...this.state.rows];
      let copiedCol = [...this.state.cols];

      copiedRow[i] += this.state.player;
      copiedCol[j] += this.state.player;
      this.setState({ rows: copiedRow, cols: copiedCol });

      //three conditions to determine the winner
      if (i === j)
        await this.setState({ diag: this.state.diag + this.state.player });
      if (i + j === 2)
        await this.setState({
          anti_diagonal: this.state.anti_diagonal + this.state.player,
        });
      if (
        [
          copiedRow[i],
          copiedCol[j],
          this.state.diag,
          this.state.anti_diagonal,
        ].includes(3)
      ) {
        this.setState({ message: "Player1 wins!!!" });
      } else if (
        [
          copiedRow[i],
          copiedCol[j],
          this.state.diag,
          this.state.anti_diagonal,
        ].includes(-3)
      ) {
        this.setState({ message: "Player2 wins!!!" });
      }

      //no winner
      if (this.state.count === 9) {
        this.setState({ message: "Draw." });
      }
    }
  };

  //RESET button - reset all the state
  reset = () => {
    debugger;
    this.setState({
      player: 0,
      count: 0,
      rows: [0, 0, 0],
      cols: [0, 0, 0],
      diag: 0,
      anti_diagonal: 0,
      player1: [],
      player2: [],
      colorMap: new Map(),
      message: "Who will be the winner?",
    });
  };
  render() {
    return (
      <div>
        <div className="main">
          <GridItem
            id={1}
            onClick={this.playerClicked}
            rindex={0}
            cindex={0}
            classes={`grid-item ${this.state.colorMap.get(1)}`}
          ></GridItem>
          <GridItem
            id={2}
            onClick={this.playerClicked}
            rindex={0}
            cindex={1}
            classes={`grid-item ${this.state.colorMap.get(2)}`}
          ></GridItem>
          <GridItem
            id={3}
            onClick={this.playerClicked}
            rindex={0}
            cindex={2}
            classes={`grid-item ${this.state.colorMap.get(3)}`}
          ></GridItem>
          <GridItem
            id={4}
            onClick={this.playerClicked}
            rindex={1}
            cindex={0}
            classes={`grid-item ${this.state.colorMap.get(4)}`}
          ></GridItem>
          <GridItem
            id={5}
            onClick={this.playerClicked}
            rindex={1}
            cindex={1}
            classes={`grid-item ${this.state.colorMap.get(5)}`}
          ></GridItem>
          <GridItem
            id={6}
            onClick={this.playerClicked}
            rindex={1}
            cindex={2}
            classes={`grid-item ${this.state.colorMap.get(6)}`}
          ></GridItem>
          <GridItem
            id={7}
            onClick={this.playerClicked}
            rindex={2}
            cindex={0}
            classes={`grid-item ${this.state.colorMap.get(7)}`}
          ></GridItem>
          <GridItem
            id={8}
            onClick={this.playerClicked}
            rindex={2}
            cindex={1}
            classes={`grid-item ${this.state.colorMap.get(8)}`}
          ></GridItem>
          <GridItem
            id={9}
            onClick={this.playerClicked}
            rindex={2}
            cindex={2}
            classes={`grid-item ${this.state.colorMap.get(9)}`}
          ></GridItem>
        </div>
        <div>
          <h2 className="winner">{this.state.message}</h2>
          <button className="reset" onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;
