'use strict'

import withType from './with-type'
import Game from '../game'
import NetEaEpicAuHorusHeresyList, {
  InvalidNetEaEpicAuHorusHeresyList
} from './list'
import Detachment from './detachments/detachment'
import LegioTitanicus from './armies/legio-titanicus'
import MechanicumTaghmata from './armies/mechanicum-taghmata'
import KnightHousehold from './armies/knight-household'
import SolarAuxilia from './armies/solar-auxilia'
import SpaceMarineLegion from './armies/space-marine-legion'

export default class NetEaEpicAuHorusHeresy extends Game {
  constructor () {
    super('netea-30k', 'netea-30k-description')

    this.armies = [
      new SpaceMarineLegion(this),
      new LegioTitanicus(this),
      new MechanicumTaghmata(this),
      new KnightHousehold(this),
      new SolarAuxilia(this)
    ]
  }

  newList (name, army) {
    const list = new NetEaEpicAuHorusHeresyList(this, name, army)

    this.addEditors(list)

    return list
  }

  listFromJSON (json) {
    try {
      const army = this.armies.find(item => item.type === json.army)

      if (!army) {
        return new InvalidNetEaEpicAuHorusHeresyList(this, json, new Error(`Invalid army ${json.army}`))
      }

      const list = new NetEaEpicAuHorusHeresyList(this, json.name, army)
      list.id = json.id

      const types = [
        'lineDetachments',
        'supportDetachments',
        'lordsOfWar'
      ]

      types.forEach(type => {
        if (json[type]) {
          list[type] = json[type]
            .map(item => Detachment.fromJSON(item, list))
        } else {
          list[type] = []
        }
      })

      if (json.allies) {
        list.allies = json.allies.map(item => {
          const ally = this.listFromJSON(item)
          ally.list = list

          return ally
        })
      } else {
        list.allies = []
      }

      this.addEditors(list)

      return list
    } catch (error) {
      console.error(error)
      return new InvalidNetEaEpicAuHorusHeresyList(this, json, error)
    }
  }

  toJSON () {
    return {
      id: this.id
    }
  }
}

withType(NetEaEpicAuHorusHeresy)
