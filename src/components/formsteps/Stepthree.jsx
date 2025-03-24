import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../store/slice/stepper";
import { usePostStepsMutation } from "../../store/services/Steps/Steps";
import toast from "react-hot-toast";
import { setStep3 } from "../../store/slice/stepSlice";
import { useForm, Controller } from "react-hook-form";
import NextButton from "../NextBtn/NextButton";
import PrevButton from "../PrevBtn/PrevButton";
import { FaCheck } from "react-icons/fa";

const Stepthree = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change to "auto" for instant scrolling
    });
  }, []);

  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.step.currentStep);

  // States
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [errorMessages, setErrorMessages] = useState({}); // Error messages for validation

  // React Hook Form
  const { control, handleSubmit, setValue, watch, trigger, formState: { errors, isValid } } = useForm({
    mode: "onChange",
  });

  // Load data from localStorage
  const stepPrevApiData = useMemo(() => localStorage.getItem("stepPrevApiData"), []);
  const stepPrev3 = useMemo(() => localStorage.getItem("step3"), []);
  const parsedData = stepPrevApiData ? JSON.parse(stepPrevApiData) : null;
  const stepPrev3Data = stepPrev3 ? JSON.parse(stepPrev3) : null;

  useEffect(() => {

    if (parsedData) {
      const medicalQuestions = parsedData?.medical_question || [];
      const lastConsultationData = parsedData?.last_consultation_data?.medicalInfo || [];

      // Merge Data
      const mergedQuestions = medicalQuestions.map((q, index) => {
        const prevAnswer = stepPrev3Data?.find((p) => p.question === q.content);
        const matchedConsultation = lastConsultationData.find(
          (lq) => lq.question === q.content
        );

        return {
          ...q,
          id: index,
          answer: prevAnswer?.answer || matchedConsultation?.answer || "",
          subfield_response: prevAnswer?.subfield_response || matchedConsultation?.subfield_response || "",
        };
      });

      setQuestions(mergedQuestions);

      // Pre-fill Form Values
      const initialResponses = {};
      mergedQuestions.forEach((q) => {
        initialResponses[q.id] = {
          answer: q.answer,
          subfield_response: q.subfield_response,
          sub_field_prompt: q.sub_field_prompt,
          has_sub_field: q.has_sub_field,
        };
        setValue(`responses[${q.id}].answer`, q.answer);
        setValue(`responses[${q.id}].subfield_response`, q.subfield_response);
      });
      setResponses(initialResponses);
    }

  }, [stepPrevApiData, stepPrev3, setValue]);

  // Handle Changes
  const handleChange = async (id, value, isSubField = false) => {
    setResponses((prev) => {

      const updated = isSubField
        ? { ...prev[id], subfield_response: value }
        : { ...prev[id], answer: value };

      // Clear subfield if "No"
      if (!isSubField && value === "no") updated.subfield_response = "";

      // Check Validation Error Message
      const question = questions.find((q) => q.id === id);
      const isAnswerValid = question?.validated_answers.includes(value);

      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: !isAnswerValid ? question?.validation_error_msg || "" : "",
      }));

      setValue(`responses[${id}]`, updated);
      trigger();

      return { ...prev, [id]: updated };
    });
  };

  // Submit API Call
  const [postSteps, { isLoading }] = usePostStepsMutation();
  const getPid = localStorage.getItem("pid");

  const onSubmit = async () => {
    const medicalInfo = questions.map((q) => ({
      question: q.content,
      qsummary: q.content,
      answer: responses[q.id]?.answer || "",
      subfield_response: responses[q.id]?.subfield_response || "",
      sub_field_prompt: responses[q.id]?.sub_field_prompt || "",
      has_sub_field: responses[q.id]?.has_sub_field || false,
    }));

    try {
      const response = await postSteps({ medicalInfo, pid: getPid }).unwrap();
      if (response?.status === true) {
        dispatch(setStep3(response?.lastConsultation?.fields?.medicalInfo));
        dispatch(nextStep());
      } else {
        toast.error("Failed to submit data.");
      }
    } catch (err) {
      toast.error("An error occurred while submitting.");
    }
  };

  // Check if Next Button Should be Enabled
  const isNextEnabled = questions.every((q) => {
    const answer = watch(`responses[${q.id}].answer`);
    const subfield = watch(`responses[${q.id}].subfield_response`);

    return (
      !errorMessages[q.id] && // No validation error message
      (answer === "no" || // "No" doesn't need subfield validation
        (answer === "yes" && (!q.has_sub_field || (subfield && subfield.trim() !== "")))) // Validate text area
    );
  });



  return (

    <div className="mx-auto md:w-[700px] w-full block sm:mt-16 mt-7 mb-36 px-6">

      <div className="flex justify-center">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl bg-[#4565BF] rounded-full text-white flex items-center justify-center w-11 h-11">
            0{currentStep}
          </span>
          <h1 className="text-2xl md:text-4xl re-font tracking-[-2px]">
            Medical Questions
          </h1>
        </div>
      </div>
      {/* <div className="flex justify-center">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl bg-[#4565BF] rounded-full text-white flex items-center justify-center w-11 h-11">
            0{currentStep}
          </span>
          <h1 className="text-2xl md:text-4xl reg-font tracking-[-2px]">Medical Questions</h1>
        </div>
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {questions.map((q) => {
          const selectedAnswer = watch(`responses[${q.id}].answer`);
          return (
            <div key={q.id} className="mb-8">
              <div className="font-reg md:text-xl text-[#1C1C29] mb-4">
                {/ul|li/.test(q.content) ? (
                  <div
                    className="font-reg md:text-xl text-[#1C1C29] mb-4 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: q.content.replace(
                        /<ul>/g,
                        '<ul class="list-disc ml-5 space-y-2">'
                      ),
                    }}
                  ></div>
                ) : (
                  // Render plain text for non-list content
                  <div className="font-reg md:text-xl text-[#1C1C29] mb-4">{q.content}</div>
                )}
              </div>
              <div className="flex gap-4 mb-4">
                {q.options.map((option) => (
                  <label
                    key={option}
                    className={`flex w-24 p-3 rounded-md shadow-md cursor-pointer border-2 items-center justify-between ${selectedAnswer === option ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"}`}
                  >
                    <Controller
                      name={`responses[${q.id}].answer`}
                      control={control}
                      render={({ field }) => (
                        <input
                          type="radio"
                          {...field}
                          value={option}
                          checked={field.value === option}
                          onChange={(e) => handleChange(q.id, e.target.value)}
                          className="hidden"
                        />
                      )}
                    />
                    <span className={`text-sm font-semibold capitalize ${selectedAnswer === option ? "text-[#4DB581]" : "text-gray-500 "}`}>
                      {option}
                    </span>
                    {selectedAnswer === option && <FaCheck color="#4DB581" className="ml-2" size={14} />}
                  </label>
                ))}
              </div>

              {errorMessages[q.id] && (
                <p className="text-red-500 text-sm mb-2">{errorMessages[q.id]}</p>
              )}

              {q.has_sub_field && selectedAnswer === "yes" && (
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder={q.sub_field_prompt}
                  value={responses[q.id]?.subfield_response}
                  onChange={(e) => handleChange(q.id, e.target.value, true)}
                />
              )}
            </div>
          );
        })}
        <div className="mt-10  justify-between mb-10 hidden sm:flex">
          <PrevButton label={"Back"} onClick={() => dispatch(prevStep())} />
          <NextButton disabled={!isNextEnabled || isLoading} label={"Next"} loading={isLoading} />
        </div>

        <div className="fixed bottom-2 w-[95%] mx-auto left-0 right-0 z-50 block sm:hidden">
          <div className="relative flex justify-between items-center bg-white/30 backdrop-blur-lg rounded-lg py-3 px-6 shadow-lg border border-white/40">

            {/* Content Layer (to prevent blur on buttons) */}
            <div className="relative flex w-full justify-between items-center">
              {/* Back Button */}
              <button
                onClick={() => dispatch(prevStep())}
                className="flex flex-col items-center justify-center text-white rounded-md bg-[#4565BF] p-3"
              >
                <span className="text-md font-semibold px-6">Back</span>
              </button>

              {/* Proceed Button */}
              <button
                type="submit"
                disabled={!isNextEnabled || isLoading}
                className={`p-3 flex flex-col items-center justify-center ${!isNextEnabled || isLoading
                  ? "disabled:opacity-50 disabled:hover:bg-[#4565BF] disabled:cursor-not-allowed bg-[#4565BF] text-white rounded-md"
                  : "text-white rounded-md bg-[#4565BF]"
                  }`}
              >
                <span className="text-md font-semibold px-6">Next</span>
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Stepthree;
