import Starter from "../components/starter";
import ProjectList from "../components/ProjectList";
const Dashboard = () => {
    return(
        <div>
            <div>
                <h2>New Project</h2>
                <Starter/>
            </div>
            <div>
                <h2>Recent Projects</h2>
                <ProjectList/>
            </div>
        </div>
    );
}
export default Dashboard;