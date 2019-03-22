import * as hyperdom from "hyperdom"
import styles from "./styles.css"
import BeerList from "./beerList"

export default class App {
  constructor () {
    this.beerList = new BeerList()
  }

  renderBody() {
    return (
      <div>
        <label>What is your name? </label>
        <input type="text" binding="this.userName" />
        {
          this.userName
            ? <div>You're now a <strong>hyperdomsta</strong> {this.userName}</div>
            : undefined
        }
        {this.userName ? this.beerList.render() : undefined}
      </div>
    )
  }

  renderHeader() {
    return (
      <div>
        <h1 class={styles.hello}>Hello from Hyperdom!</h1>
        <a href="#" onclick={() => this.hideGreeting = true}>Next</a>
      </div>
    )
  }

  render() {
    return (
      <main>{this.hideGreeting ? this.renderBody() : this.renderHeader()}</main>
    )
  }
}
