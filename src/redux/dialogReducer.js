const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
  dialogs: [
    {
      id: 1,
      name: 'Даниэль',
      surname: 'Чудновский',
      emoji: String.fromCodePoint(129473),
    },
    { id: 2, name: 'Андрей', surname: 'Бебуришвили' },
    {
      id: 3,
      name: 'Стас',
      surname: 'Васильев',
      emoji: String.fromCodePoint(128126),
    },
    { id: 4, name: 'Антон', surname: 'Власов' },
    { id: 5, name: 'Барри', surname: 'Аллен' },
  ],
  messages: ['Привет', 'Как дела?)'],
};

function dialogReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return { ...state, messages: [...state.messages, action.messageText] };
    default:
      return state;
  }
}

export function sendMessage(messageText) {
  return {
    type: SEND_MESSAGE,
    messageText,
  };
}

export default dialogReducer;
