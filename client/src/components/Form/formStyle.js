import { makeStyles } from "@material-ui/styles";

export const formStyle = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
  },
  form: {
    textAlign: "center",
  },
  btnSubmit: {
    marginTop: 40,
    paddingInline: 50,
  },
  remindText: {
    marginTop: 35,
    fontSize: "12px",
  },
  btnAction: {
    borderRadius: 5,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    paddingInline: 25,
    paddingBlock: 10,
    marginTop: 20,
    fontSize: "12px",
  },
  gradientContainer: {
    background: "linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%);",
    opacity: "85%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    backgroundImage: "url(/images/bg-img.png)",
    backgroundSize: "cover",
  },
  msgIcon: {
    width: 50,
    height: 50,
  },
  imageText: {
    color: "#ffffff",
    fontWeight: 600,
    fontFamily: "Open Sans",
    textAlign: "center",
    opacity: "100%",
  },
});
