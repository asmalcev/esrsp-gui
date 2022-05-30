Для рефакторинга когда-нибудь :)
1) AppContext из _app переписать в contexts/AuthContext и в _app подтягивать уже оттуда
2) url доступа к api хранить в отдельном файле urls
3) axios вместо fetch
4) AuthService для запросов
5) переработать if-ы в mount useEffect в AuthContainer
6) доделать AuthContainer и AuthForm