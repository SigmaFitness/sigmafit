

export const PhoneMock = ({ imgUrl, phoneTypeId = "1", className="rounded-lg w-full mt-16" }: { imgUrl: string; phoneTypeId?: string; className?: string }) => (
  <div className="mockup-phone scale-75 sm:scale-90 border-blue-600 mx-0">
    <div className="camera"></div>
    <div className="display">
      <div className={`artboard artboard-demo phone-${phoneTypeId}  max-w-full`}>
        <img
          src={imgUrl}
          className={className} />
      </div>
    </div>
  </div>
);
