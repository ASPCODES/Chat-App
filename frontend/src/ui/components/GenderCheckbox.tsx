import { useState } from "react";

const GenderCheckbox: React.FC = () => {
  const [gender, setGender] = useState<string | null>(null);

  const handleGenderChange = (selectedGender: string) => {
    setGender(gender === selectedGender ? null : selectedGender);
  };

  return (
    <div className="flex gap-4">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={gender === "male"}
            onChange={() => handleGenderChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={gender === "female"}
            onChange={() => handleGenderChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
