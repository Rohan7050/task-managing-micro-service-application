// import { createBoard } from "@/api/endpoints/board.api";
import { boardFormSchema, type BoardFormType } from "@/schema/boardFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import type { AxiosError } from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
// import toast from "react-hot-toast";

interface BoardFormProps {
  name: string;
  desc: string;
  id: string;
  mutate: (data: { name: string; desc: string; id: string }) => void;
}

const BoardForm: React.FC<BoardFormProps> = ({ name, desc, id, mutate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardFormType>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: {
      name,
      desc,
    },
  });

  const onSubmit: SubmitHandler<BoardFormType> = (data) => {
    mutate({ ...data, id });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6">
        <div>
          <label className="text-start block text-sm/6 font-semifold text-white">
            Board Name
          </label>
          <div className="mt-2.5">
            <input
              {...register("name", {
                maxLength: 20,
                minLength: 5,
                required: true,
              })}
              type="text"
              name="name"
              placeholder="Enter Board Name"
              className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-offset-2 focus:outline-indigo-500"
            />
            {errors.name && (
              <p className="text-red-300 text-start text-sm mt-1">
                Invalid Name (must be 5 to 20 charactor long)
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="text-start block text-sm/6 font-semifold text-white">
            Board Description
          </label>
          <div className="mt-2.5">
            <textarea
              {...register("desc")}
              name="desc"
              placeholder="Enter Description"
              className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-offset-2 focus:outline-indigo-500"
            />
          </div>
        </div>
        <div className="mt-15">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default BoardForm;
