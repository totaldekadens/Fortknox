import { Link } from 'react-router-dom';
import { FC } from 'react';

import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface Props {}


const Navbar: FC<Props> = (props) => {
    return (
        <div style={{display: "flex", justifyContent: "space-between", padding: "20px", backgroundColor: "grey"}}>
            <div>
                <Link style={{color: "inherit", textDecoration: "none", fontSize: "30px"}} to={"/"} >Fortknox</Link>
            </div>
            <div>
                <Link to={"/checkout"}>
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary"> {/* Denna blir dynamisk sedan */}
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
                </Link>
            </div>
        </div>
    )
}


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));





export default Navbar


