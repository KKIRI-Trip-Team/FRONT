export type RegisterStepTypes = {
  registerStep: {
    email: string;
    password: string;
    passwordConfirm: string;
  };
  nicknameStep: {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname?: string;
    profileImage?: string;
  };
  completeStep: {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    profileImage?: string;
  };
};
