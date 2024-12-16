const ProfilePhoto = ({ profileUrl = "" }) => {
  return (
    <div className="flex w-full justify-center">
      <img
        src={profileUrl}
        alt=""
        className="h-[150px] w-[150px] rounded-full bg-primary object-cover xl:h-[250px] xl:w-[250px]"
      />
    </div>
  );
};
export default ProfilePhoto;
