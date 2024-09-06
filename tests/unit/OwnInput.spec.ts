//integration test
import { mount } from "@vue/test-utils";
import OwnInput from "@/components/OwnInput.vue";

describe("OwnInput", () => {
  it("update modelValue when typing in input", async () => {
    const wrapper = mount(OwnInput, {
      props: {
        modelValue: "Initial Value",
        label: "Test Label",
      },
    });

    const input = wrapper.find("input");
    expect(input.element.value).toBe("Initial Value");

    await input.setValue("New Value");

    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["New Value"]);
  });
});
