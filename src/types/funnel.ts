export interface RegisterStepProps {
  funnel: {
    history: {
      push: (
        step: string,
        context: {
          email: string;
          password: string;
        },
      ) => void;
    };
  };
  // onNext: (nickname: string, profileImage: string) => void;
  onNext: (email: string, password: string) => void;
}

export interface ProfileStepProps {
  email: string;
  password: string;
  onNext?: () => void;
}

export interface ProfileFormData {
  email: string;
  nickname: string;
  profileUrl?: string;
}
