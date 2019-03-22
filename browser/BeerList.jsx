import * as hyperdom from "hyperdom"
import styles from "./styles.css"
import routes from "./routes"

export default class BeerList {

  async onload() {
    this.isLoadingBeer = true

    const response = await fetch("https://api.punkapi.com/v2/beers")
    this.beers = await response.json()

    this.isLoadingBeer = false
  }

  routes() {
    return [
      routes.beers({
        render: () => {
          return <div>{this.isLoadingBeer ? 'Loading...' : this.renderTable()}</div>
        }
      }),
      routes.beer({
        bindings: {
          id: [this, 'beerId']
        },
        render: () => {
          return <div>{this.isLoadingBeer ? 'Loading...' : this.renderCurrentBeer()}</div>
        }
      })
    ]
  }

  renderCurrentBeer() {
    const beer = this.beers.find(beer => beer.id == this.beerId)
    return <img src={beer.image_url}/>
  }

  renderTable() {
    return (
      <div>
        <table class={styles.beerList}>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Tagline</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.beers.map(({id, name, tagline, image_url}) => {
              return (
                <tr>
                  <td>
                    <img height="50" src={image_url} />
                  </td>
                  <td>{name}</td>
                  <td>{tagline}</td>
                  <td><a href={routes.beer.href({id})}>show</a></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
