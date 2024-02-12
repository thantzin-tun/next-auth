import { auth } from "../../../../auth";

const ProfilePage = () => {
    const session = auth();
    return (
        <div>
            ProfilePage
            {JSON.stringify(session)}
        </div>
    );
};

export default ProfilePage;
