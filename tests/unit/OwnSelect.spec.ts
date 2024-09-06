import { mount } from "@vue/test-utils";
import OwnSelect from "@/components/OwnSelect.vue";

describe("OwnSelect.vue", () => {
  it("display the selected option based on the initial modelValue", async () => {
    const options = [
      { id: "1", name: "Option 1" },
      { id: "2", name: "Option 2" },
    ];

    const wrapper = mount(OwnSelect, {
      props: {
        modelValue: "1",
        options,
      },
    });

    const selectedItem = wrapper.find(".selected-item");
    expect(selectedItem.text()).toBe("Option 1");
  });

  it("open the dropdown when the selected item is clicked", async () => {
    const options = [
      { id: "1", name: "Option 1" },
      { id: "2", name: "Option 2" },
    ];

    const wrapper = mount(OwnSelect, {
      props: {
        modelValue: "1",
        options,
      },
    });

    const selectedItem = wrapper.find(".selected-item");
    await selectedItem.trigger("click");

    expect(wrapper.find(".dropdown-list").exists()).toBe(true);
  });

  it("display 'Select an option' if no option matches the modelValue", async () => {
    const options = [
      { id: "1", name: "Option 1" },
      { id: "2", name: "Option 2" },
    ];

    const wrapper = mount(OwnSelect, {
      props: {
        modelValue: "3",
        options,
      },
    });

    const selectedItem = wrapper.find(".selected-item");
    expect(selectedItem.text()).toBe("Select an option");
  });
});
