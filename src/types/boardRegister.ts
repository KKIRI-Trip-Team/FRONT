export type BoardRegisterTypes = {
  destinationStep: {
    destination: string;
  };

  periodStep: {
    destination: string;
    period?: string;
  };

  mateStep: {
    destination: string;
    period: string;
    gender?: string;
    ageRange?: string[];
  };

  styleStep: {
    destination: string;
    period: string;
    gender: string;
    ageRange: string[];
    styles?: string[];
  };

  expenseStep: {
    destination: string;
    period: string;
    gender: string;
    ageRange: string[];
    styles: string[];
    expense?: number;
  };

  explainStep: {
    destination: string;
    period: string;
    gender: string;
    ageRange: string[];
    styles: string[];
    expense: number;
    explain?: {
      title: string;
      subTitle: string;
      image: string;
    };
  };
};
