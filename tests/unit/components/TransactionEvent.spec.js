import MockHelper from '../MockHelper';

import TransactionEvent from '@/components/TransactionEvent.vue';
import ABIProp from '../fixtures/ABIProp.json';
import LogProp from '../fixtures/LogProp.json';

describe('TransactionEvent.vue', () => {
    let helper;

    beforeEach(() => {
        helper = new MockHelper();
    });

    it('Should display transaction event', async (done) => {
        const wrapper = helper.mountFn(TransactionEvent, {
            propsData: {
                log: LogProp,
                abi: ABIProp
            }
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.html()).toMatchSnapshot();
        done();
    });

    it('Should display warning if no ABI', async (done) => {
        const wrapper = helper.mountFn(TransactionEvent, {
            propsData: {
                log: LogProp
            }
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.html()).toMatchSnapshot();
        done();
    });    

    afterEach(async () => {
        await helper.clearFirebase();
    });
});