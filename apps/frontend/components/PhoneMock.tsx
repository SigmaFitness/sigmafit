

export const PhoneMock = ({ imgUrl, phoneTypeId = "1" }: { imgUrl: string; phoneTypeId?: string; }) => (
  <div className="mockup-phone scale-75 sm:scale-90 border-blue-600 mx-0">
    <div className="camera"></div>
    <div className="display">
      <div className={`artboard artboard-demo phone-${phoneTypeId}  max-w-full`}>
        <img
          src={imgUrl}
          className={"rounded-lg w-full mt-16"} />
      </div>
    </div>
  </div>
);
