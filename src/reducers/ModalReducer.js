import ActionTypes from 'actions/ActionTypes'

export default function ModalReducer(state,dispatch){
    switch(dispatch.type){
        case ActionTypes.OPEN_SUBJECT_MODAL:
            return {
                ...state,
                isSubjectModalOpen:true
            }
        case ActionTypes.CLOSE_SUBJECT_MODAL:
            return {
                ...state,
                isSubjectModalOpen:false
            }
        case ActionTypes.OPEN_LESSON_MODAL:
            return {
                ...state,
                isLessonModalOpen:true
            }
        case ActionTypes.CLOSE_LESSON_MODAL:
            return {
                ...state,
                isLessonModalOpen:false
            }

        default:
            return state
    }
}