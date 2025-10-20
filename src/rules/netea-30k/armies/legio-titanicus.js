'use strict'

import Army from './army'
import {
  LegioTitanicusWarhoundTitanDetachment,
  LegioTitanicusWarhoundTitanPackDetachment,
  LegioTitanicusReaverTitanDetachment,
  LegioTitanicusWarlordTitanDetachment,
  LegioTitanicusEmperorClassTitanDetachment
} from '../detachments/legio-titanicus'
import SolarAuxilia from './solar-auxilia'
import MechanicumTaghmata from './mechanicum-taghmata'
import KnightHousehold from './knight-household'
import withType from '../with-type'

export default class LegioTitanicus extends Army {
  constructor (game) {
    super(game, 'legio-titanicus')

    this.lineDetachments = [
      LegioTitanicusWarhoundTitanDetachment,
      LegioTitanicusWarhoundTitanPackDetachment,
      LegioTitanicusReaverTitanDetachment,
      LegioTitanicusWarlordTitanDetachment
    ]
    this.lordsOfWar = [
      LegioTitanicusEmperorClassTitanDetachment
    ]
    this.allies.push(
      SolarAuxilia,
      MechanicumTaghmata,
      KnightHousehold,
    )
  }

  getStrategyRating (list) {
    const rating = 3

    if (list.allies.find(item =>
      item.army.type === ImperialMilitia.type ||
      item.army.type === SolarAuxilia.type ||
      item.army.type === DaemonicHordes.type
    )) {
      return rating - 1
    }

    return rating
  }
}

withType(LegioTitanicus)
