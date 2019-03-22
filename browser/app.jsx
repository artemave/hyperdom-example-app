import * as hyperdom from "hyperdom"
import styles from "./styles.css"
import BeerList from "./beerList"
import routes from "./routes"

export default class App {
  constructor () {
    this.beerList = new BeerList()
  }

  routes() {
    return [
      routes.home({
        render: () => {
          return this.hideGreeting ? this.renderBody() : this.renderHeader()
        }
      }),
      this.beerList
    ]
  }

  renderLayout(content) {
    return <main>{content}</main>
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
        {this.userName ? <a href={routes.beers.href()}>Have a beer</a> : undefined}
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
}
