import { authFlow } from "../auth";
import { authorize, logout } from "../../actions/auth";
import { select, call, take, put } from "redux-saga/effects";
import { getIsAuthorized } from "../../reducers/auth";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from "../../localStorage";
import { setTokenApi, clearTokenApi } from "../../api";

describe("Сага authFlow", () => {
  const saga = authFlow();
  const token = 123;

  describe("Сценарий без токена авторизации в localstorage", () => {
    it("1. Эфект select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });

    it("2. Эфект call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });

    it("3. Эфект take с ожиданием authorize", () => {
      expect(saga.next().value).toEqual(take(authorize));
    });

    it("4. Эфект call(setTokenApi, token) где токен, который получен из прошлого шага", () => {
      expect(saga.next({ payload: token }).value).toEqual(
        call(setTokenApi, token)
      );
    });

    it("5. Эфект call setTokenToLocalStorage", () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });

    it("6. Эфект take logout", () => {
      expect(saga.next().value).toEqual(take(logout));
    });

    it("7. Эфект call removeTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
    });

    it("8. Эфект call clearTokenApi", () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });

  describe("Сценарий c токеном авторизации из localstorage", () => {
    const localStorageToken = 123;

    it("1. Эфект select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });
    it("2. Эфект call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });
    it("3. Эфект put(authorize()) при наличии токена в LS", () => {
      expect(saga.next(localStorageToken).value).toEqual(put(authorize()));
    });
    it("4. Эфект call(setTokenApi, token) где токен, который получен из прошлого шага", () => {
      expect(saga.next({ payload: token }).value).toEqual(
        call(setTokenApi, token)
      );
    });

    it("5. Эфект call setTokenToLocalStorage", () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });
    it("6. Эфект take logout", () => {
      expect(saga.next().value).toEqual(take(logout));
    });

    it("7. Эфект call removeTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
    });

    it("8. Эфект call clearTokenApi", () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });
});
