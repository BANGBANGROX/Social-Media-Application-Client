import gql from "graphql-tag";
import React, { useState, useContext } from "react";

// Semantic ui
import { Button, Form } from "semantic-ui-react";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";

import { useForm } from "../util/hooks";

const Login = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const inititalSate = {
    username: "",
    password: "",
  };
  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    inititalSate
  );
  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      //console.log(userData);
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={onSubmit}
        noValidate
        className={loading === true ? "loading" : ""}
      >
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          type="text"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          type="password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value, i) => (
              <li key={i}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export default Login;
