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
    ages?: string[];
  };

  styleStep: {
    destination: string;
    period: string;
    gender: string;
    ages: string[];
    styles?: string[];
  };

  expenseStep: {
    destination: string;
    period: string;
    gender: string;
    ages: string[];
    styles: string[];
    expense?: string;
  };
};
