import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import autosize from 'autosize';
import { sendMessage } from '../../redux/dialogReducer';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import './Dialogs.css';

function Dialogs() {
  const messageTextRef = useRef(null);
  useEffect(() => {
    document.title = 'Сообщения';
    autosize(messageTextRef.current);
  }, []);

  const dispatch = useDispatch();
  const addMessage = (values, { resetForm }) => {
    dispatch(sendMessage(values.messageText.trim()));
    resetForm();
    autosize.update(messageTextRef.current);
  };

  let dialogs = useSelector((state) => state.dialogPage.dialogs);
  dialogs = useMemo(
    () =>
      dialogs.map((dialog) => (
        <Dialog
          key={dialog.id}
          id={dialog.id}
          name={dialog.name}
          surname={dialog.surname}
          emoji={dialog.emoji}
        />
      )),
    [dialogs]
  );

  let messages = useSelector((state) => state.dialogPage.messages);
  messages = messages.map((message) => <Message text={message} />);

  return (
    <div id="dialogs">
      <div className="wrapper" style={{ padding: '0px', marginRight: '8px' }}>
        {dialogs}
      </div>
      <div id="dialog" className="wrapper">
        <div id="dialog__history">
          <div id="messages">{messages}</div>
        </div>
        <SendMessageForm
          messageTextRef={messageTextRef}
          addMessage={addMessage}
        />
      </div>
    </div>
  );
}

function SendMessageForm(props) {
  const { messageTextRef, addMessage } = props;
  const initialValues = {
    messageText: '',
  };
  const validationSchema = Yup.object({
    messageText: Yup.string().trim().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={addMessage}
    >
      <Form id="dialog__send-message">
        <Field
          as="textarea"
          name="messageText"
          innerRef={messageTextRef}
          rows="1"
          placeholder="Напишите сообщение..."
        />
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
}

export default Dialogs;
