import { combineReducers } from 'redux'
import { postsBySubreddit, selectedSubreddit } from './ajaxReducer'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit

})

export default rootReducer
