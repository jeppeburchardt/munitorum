import ListEditor from './netea/list-editor'
import ListViewer from './netea/list-viewer'
import TopBar from './netea/top-bar'

import ListEditor30k from './netea-30k/list-editor'
import ListViewer30k from './netea-30k/list-viewer'
import TopBar30k from './netea-30k/top-bar'


import games from '../../rules'


games[0].addEditors = (list) => {
    list.getEditor = () => {
      return ListEditor30k
    }
    list.getViewer = () => {
      return ListViewer30k
    }
    list.getTopBar = () => {
      return TopBar30k
    }
  }

  games[1].addEditors = (list) => {
    list.getEditor = () => {
      return ListEditor
    }
    list.getViewer = () => {
      return ListViewer
    }
    list.getTopBar = () => {
      return TopBar
    }
  }



// games.forEach((game) => {
//   game.addEditors = (list) => {
//     list.getEditor = () => {
//       return ListEditor
//     }
//     list.getViewer = () => {
//       return ListViewer
//     }
//     list.getTopBar = () => {
//       return TopBar
//     }
//   }
// })

export default games
