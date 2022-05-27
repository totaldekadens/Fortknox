import { Link } from 'react-router-dom';
import { FC } from 'react';
import { colors } from '../../data/color'

import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {}


const Navbar: FC<Props> = (props) => {
    return (
        <div style={{display: "flex", justifyContent: "space-between", padding: "20px", backgroundColor: colors.primary }}>
            <div>
                <Link style={{color: "white", textDecoration: "none", fontSize: "30px"}} to={"/"} >Fortknox</Link>
            </div>
            <div style={{display: "flex", gap: "20px"}}>
                <Link style={{textDecoration: "none", display: "flex", alignItems: "center", color: "white" }} to={`/admin`} >
                    Admin
                </Link>
                <Link to={"/checkout"}>
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} style={{color: "white"}} > {/* Denna blir dynamisk sedan */}
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
                </Link>
                <IconButton style={{color: "white"}}>
                        <MenuIcon />
                </IconButton>
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


