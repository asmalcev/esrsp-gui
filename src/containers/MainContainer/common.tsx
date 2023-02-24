import { AppBar, Stack, styled } from '@mui/material';

import styles from './MainContainer.styles';

const Menu = styled(Stack)(styles.menu);
const Header = styled(AppBar)(styles.appBar);

export { Menu, Header };
