import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { selectors, UserHook, UserPayload, UserRegisterPayload } from "../../libs/users";
import { DataContext } from "../AppProvider";
import { Container, Position, Size } from "../Container";
import { Loading } from "../Loading";

export const RegisterContainer = (): JSX.Element => {
  const router = useRouter();
  const { auth } = useContext(DataContext);
  const [userRegisterPayload, setUserRegisterPayload] = useState<UserRegisterPayload>(initialRegisterPayload);
  const [userLoginPayload, setUserLoginPayload] = useState<UserPayload>(initialLoginPayload);

  const updateUserRegisterPayload = updateItem(userRegisterPayload, setUserRegisterPayload);
  const updateUserLoginPayload = updateItem(userLoginPayload, setUserLoginPayload);

  useEffect(() => {
    if (selectors.isLoggedIn(auth)) {
      setTimeout(() => {
        router.push('/?panel=2');
      }, 500);
    }
  });

  return (
    <Container
      position={Position.ABSOLUTE}
      size={Size.SMALL}
      title="Register"
    >
      <div className="text-center">
        <Feedback state={auth} />
      </div>
      <div className="flex p-5">
        <div className="flex flex-col w-2/4 pr-4">
          <div className="text-center">Sign in</div>
          <label htmlFor="login_email">Email:</label>
          <input
            onChange={(ev) => updateUserLoginPayload("username", ev.target.value)}
            value={userLoginPayload.username}
            type="email"
            name="login_email"
            placeholder="Your email"
            className="mb-4 p-1 border border-black"
          />
          <label htmlFor="login_password">Password:</label>
          <input
            onChange={(ev) => updateUserLoginPayload("password", ev.target.value)}
            value={userLoginPayload.password}
            type="password"
            name="login_password"
            placeholder="Your password"
            className="mb-4 p-1 border border-black"
          />
          <div className="btn btn-primary p-1 text-center" onClick={() => {
            auth?.login({
              username: userLoginPayload.username,
              password: userLoginPayload.password
            })
            .then(() => {
              setUserLoginPayload(initialLoginPayload);
              setUserRegisterPayload(initialRegisterPayload);
            })
          }}>Login</div>
        </div>
        <div className="flex flex-col w-2/4 pl-4">
          <div className="text-center">Sign up</div>
          <label htmlFor="register_email">Email:</label>
          <input
            onChange={(ev) => updateUserRegisterPayload("username", ev.target.value)}
            value={userRegisterPayload.username}
            type="email"
            name="register_email"
            placeholder="Your email"
            className="mb-4 p-1 border border-black"
          />
          <label htmlFor="register_password">Password:</label>
          <input
            onChange={(ev) => updateUserRegisterPayload("password", ev.target.value)}
            value={userRegisterPayload.password}
            type="password"
            name="register_password"
            placeholder="Your password"
            className="mb-4 p-1 border border-black"
          />
          <label htmlFor="register_password2">Repeat password:</label>
          <input
            onChange={(ev) => updateUserRegisterPayload("password2", ev.target.value)}
            value={userRegisterPayload.password2}
            type="password"
            name="register_password2"
            placeholder="Your password"
            className="mb-4 p-1 border border-black"
          />
          <div className="btn btn-primary p-1 text-center" onClick={() => {
            auth?.signup({
              username: userRegisterPayload.username,
              password: userRegisterPayload.password,
              password2: userRegisterPayload.password2,
            })
            .then(() => {
              setUserLoginPayload(initialLoginPayload);
              setUserRegisterPayload(initialRegisterPayload);
            })
          }}>Register</div>
        </div>
      </div>
      <Loading isLoading={selectors.isLoading(auth)} />
    </Container>
  )
}

interface FeedbackProps {
  state?: UserHook;
}
const Feedback = (props: FeedbackProps): JSX.Element => {
  const feedback = selectors.getFeedback(props.state);

  if (!feedback) {
    return <></>;
  }

  return (
    <ul>
      {
        Object.keys(feedback).flatMap((key, index) => {
          const feedbackMessages: string | string[] = feedback[key];
          if (Array.isArray(feedbackMessages)) {
            return feedbackMessages.map((message, innerIndex) => (
              <li key={`${index}-${innerIndex}`} className="text-red-600">{key}: {message}</li>
            ));
          } else {
            return (
              <li>
                {selectors.isWaiting(props.state) || selectors.isLoggedIn(props.state)
                  ? <span className="text-green-600">{feedback[key]}</span>
                  : <span className="text-red-600">{feedback[key]}</span>}
              </li>
            );
          }
        })
      }
    </ul>
  )
}

const initialRegisterPayload = {
  username: "",
  password: "",
  password2: "",
}

const initialLoginPayload = {
  username: "",
  password: "",
}

const updateItem = <T,>(currentState: T, dispatch: Dispatch<SetStateAction<T>>) => (key: keyof T, value: string): void => {
  dispatch({
    ...currentState,
    [key]: value
  });
}
