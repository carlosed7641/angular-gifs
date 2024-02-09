import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces'

const GIPHY_API_KEY = 'ObMPKbFqXsnyUKnI3pqnl8mbSd3t4hiW'

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  gifsList: Gif[] = []

  private _tagsHistory: string[] = []
  private _apiKey: string = GIPHY_API_KEY
  private _url: string = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }


  get tagsHistory(): string[] {
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string) {

    tag = tag.trim().toLowerCase()

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag)
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0, 10)
    this.saveLocalStorage()

  }

  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage() {
    const history = localStorage.getItem('history')
    if (history) this._tagsHistory = JSON.parse(history)

    if (this._tagsHistory.length > 0) {
      this.searchGif(this._tagsHistory[0])
    }
  }

  searchGif(tag: string) {

    if (!tag.trim().length) return
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('q', tag)
      .set('limit', '10')

    this.http.get<SearchResponse>(`${this._url}/search`, { params })
      .subscribe(resp => {
        this.gifsList = resp.data
      })

  }
}
