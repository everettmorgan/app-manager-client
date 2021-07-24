<template>
  <v-form>
    <h2>Plans</h2>
    <v-container class="ps-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            small
            class="mr-4"
            v-for="(plan, idx) in plans"
            :key="plan.plan_uuid"
            @click.stop="current = idx"
            :color="idx === current ? 'primary' : 'default'"
          >
            {{
              plan.plan_profiles.en
                ? plan.plan_profiles.en.plan_name
                : plan.plan_uuid
            }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h4>Type: {{ plans[current].plan_type }}</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <v-text-field
            outlined
            label="name"
            placeholder="name"
            :value="
              plans[current].plan_profiles.en
                ? plans[current].plan_profiles.en.plan_name
                : plans[current].plan_uuid
            "
          >
          </v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            outlined
            label="subtitle"
            placeholder="subtitle"
            :value="
              plans[current].plan_profiles.en
                ? plans[current].plan_profiles.en.plan_subtitle
                : ''
            "
          >
          </v-text-field>
        </v-col>
        <v-col cols="2">
          <v-switch
            v-model="plans[current].is_hidden"
            inset
            :label="`Hidden`"
          ></v-switch>
        </v-col>
      </v-row>
      <v-row v-if="plans[current].plan_profiles.en">
        <v-col
          cols="12"
          v-for="(feature, idx) in plans[current].plan_profiles.en.plan_features"
          :key="idx"
        >
          <v-text-field
            outlined
            label="feature"
            placeholder="feature"
            :value="feature"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn block class="mb-7">
            Add Feature
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "Plans",
  props: {
    plans: Array,
  },
  data: () => ({
    current: 0,
  }),
};
</script>

<style>
</style>