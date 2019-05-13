const ROW_HEIGHT = 250;
const ROW_ITEMS = 4;

const initialState = {
    loading: true,
    cards: [],
    displayImageId: null,
    pageSize: (Math.ceil(window.innerHeight) / ROW_HEIGHT) * ROW_ITEMS,
    pageIndex: 0,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_IMAGES':
            return {
                ...state,
                loading: true,
            };

        case 'FETCH_IMAGES_COMPLETED':
            const startIndex = !state.pageIndex ? 0 : state.pageIndex * state.pageSize;
            return {
                ...state,
                cards: state.cards.concat(action.response.slice(startIndex, state.pageSize + startIndex)),
                pageIndex: state.pageIndex + 1,
                loading: false,
            };

        case 'DISPLAY_IMAGE':
            const displayImageId = state.displayImageId === action.id ? null : action.id;
            return {
                ...state,
                displayImageId,
            };

        default:
            return state;
    }
}
