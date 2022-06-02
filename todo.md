Для рефакторинга когда-нибудь :)
1) AppContext из _app переписать в contexts/AuthContext и в _app подтягивать уже оттуда
2) url доступа к api хранить в отдельном файле urls
3) axios вместо fetch
4) AuthService для запросов
5) переработать if-ы в mount useEffect в AuthContainer
6) доделать AuthContainer и AuthForm ✅
7) хранить хэши паролей
8) требовать jwt на всех страницах и всех api
9) проверять, может ли пользователь редактировать данные
10) исправить прыгающую AuthForm