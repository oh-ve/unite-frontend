import missionPic from "../Images/sign-up.png";
import { Navigate, useNavigate } from "react-router-dom";

export default function Mission() {
  const navigate = useNavigate();
  return (
    <div className="Mission">
      <img src={missionPic} />
      <div className="missionText">
        <h1 id="missionh1yellow">Our Mission:</h1>
        <h1 id="missionh1black">A Fair And Safe Workplace</h1>
        <p>
          In today's fast-paced world, the workplace is a crucial part of our
          lives. It's where we spend a large portion of our time and where we
          earn a living. However, many employees feel like they are not being
          treated fairly and their voices are not being heard. This is where
          Unite! comes in.
        </p>
        <h2 id="missionh2black">Every Voice</h2>
        <h2 id="missionh2yellow"> Deserves To Be Heard</h2>

        <p>
          Unite! is a website that provides a platform for employees to come
          together, compare salaries, connect with each other, and message their
          work council representatives. The tool also helps work council
          representatives to stay in touch with the employees. The goal of
          Unite! is to encourage unity and solidarity among workers, ensuring
          that every voice is heard and that everyone is treated fairly and
          safely in the workplace.
        </p>
        <h2 id="missionh2black">Helping You To</h2>
        <h2 id="missionh2yellow"> Negotiate Fair Pay</h2>
        <p>
          With Unite!, employees can anonymously and safely share their
          experiences and opinions, giving them the power to unite and create
          positive change in their workplace. This can lead to increased job
          satisfaction and a better overall work environment. Unite! also allows
          employees to compare their salaries with others in the same role and
          industry, providing valuable information for negotiating fair pay.
        </p>
        <h2 id="missionh2black">Stay In Touch</h2>
        <h2 id="missionh2yellow"> With Your Work Council</h2>
        <p>
          Unite! is not just for employees, however. Work council
          representatives also have a crucial role to play in creating a fair
          and safe workplace. With Unite!, work council representatives can stay
          informed and up-to-date on the concerns and experiences of employees,
          enabling them to address any issues and improve the workplace for
          everyone.
        </p>
        <button onClick={() => navigate(`/`)} className="backButt">
          Back to main
        </button>
      </div>
    </div>
  );
}
