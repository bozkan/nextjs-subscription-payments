interface props {
  classes?: string;
}

const Logo = ({classes} : props) => (
  <img className={classes} src="logo.png" alt="SaaS Tick Logo"/>
);

export default Logo;
