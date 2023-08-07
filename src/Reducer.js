function reducer(state , action){
    switch(action) {
        case 'I' : {
            return {...state, count: state.count+1}
        }
        case "D" : {
            return {...state, count: state.count -1}
        }
        default : {
            return null;
        }
    }

}
export  {reducer}