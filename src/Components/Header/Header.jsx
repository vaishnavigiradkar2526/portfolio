import Styles from "./Header.module.css"
const Header = () => {
  return (
    <>
      <div className={Styles.header}>
        <div className={Styles.header_left}>
          <img src="" alt="" className={Styles.logo} />
        </div>

        <div className={Styles.header_right}>
          <img loading="lazy" src={"Assets/Header/icons8-linkedin.svg"} alt="Linkedin" className={Styles.Linkedin} style={{width:"30px", height:"30px"}} />
          <img loading="lazy" src={"Assets/Header/icons8-github.svg"} alt="Github" className={Styles.Github} style={{width:"30px", height:"30px"}} />
        </div>
      </div>
    </>
  );
};
export default Header;
