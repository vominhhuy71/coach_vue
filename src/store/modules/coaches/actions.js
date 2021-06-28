export default {
  async addCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      hourlyRate: data.rate,
      areas: data.areas
    };
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vue-http-demo-c0649-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    // const responseData = await response.json();
    if (!response.ok) {
      // error handling...
    }

    context.commit('addCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    if (!context.getters.shouldUpdate && !payload.forceRefresh) {
      return;
    }

    const response = await fetch(
      `https://vue-http-demo-c0649-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      // error handling...
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
