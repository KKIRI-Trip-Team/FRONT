import { DayPlan } from './board';

export type BoardRegisterSteps = {
  regionStep: {
    region: string;
  };

  periodStep: {
    region: string;
    period: string;
  };

  mateStep: {
    region: string;
    period: string;
    gender: string;
    ageGroup: string;
  };

  styleStep: {
    region: string;
    period: string;
    gender: string;
    ageGroup: string;
    tripStyles: string[];
  };

  expenseStep: {
    region: string;
    period: string;
    gender: string;
    ageGroup: string;
    tripStyles: string[];
    cost: number;
  };

  explainStep: {
    region: string;
    period: string;
    gender: string;
    ageGroup: string;
    tripStyles: string[];
    cost: number;
    explain: {
      title: string;
      subTitle: string;
      coverImageUrl: string;
    };
  };

  detailStep: {
    region: string;
    period: string;
    gender: string;
    ageGroup: string;
    tripStyles: string[];
    cost: number;
    explain: {
      title: string;
      subTitle: string;
      coverImageUrl: string;
    };
    daysPlan: DayPlan[];
  };
};
