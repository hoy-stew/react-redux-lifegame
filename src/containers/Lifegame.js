import { connect } from 'react-redux';
import * as actions from '../actions/Lifegame';
import Lifegame from '../components/Lifegame';


const mapStateToProps = state => {
  return {
    cells: state.lifegame.cells,
    age: state.lifegame.age,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initialize: (size) => dispatch(actions.initialize(size)),
    next: () => dispatch(actions.next()),
    setStatus: (x, y, status) => dispatch(actions.setStatus(x, y, status)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lifegame);