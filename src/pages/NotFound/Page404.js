import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../../components/setPage/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Page title="404 Page Not Found">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Cái này mị chưa phát triển kịp á, zui lòng đi tới tính năng khác trong thời gian tới á
            Cảm ơn mấy đứa đã ghé thăm web của mị

          </Typography>

          <Box
            component="img"
            src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/124246434_2767458533572690_5753038523313211503_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_ohc=gNSwgmJuIpAAX_nSC7i&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT_PCympqgvbqTtbon2o02qDN9XP6VIJSY8yKNmrxGG4GQ&oe=633C52F0"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
