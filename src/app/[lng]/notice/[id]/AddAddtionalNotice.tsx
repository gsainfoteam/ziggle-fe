interface AddAddtionalNoticesProps {}

const AddAddtionalNotice = async ({}: AddAddtionalNoticesProps) => {
  return (
    <div>
      <BorderBox
        borderRadius={'15px'}
        width={'70%'}
        variant={ButtonVariant.outlined}
      >
        <div
          style={{ justifyContent: 'left', display: 'flex', margin: '10px' }}
        >
          <Text font={Font.Bold} size="1.5rem" color={colorSet.primary}>
            + 추가공지
          </Text>
        </div>
        <Flex alignItems={'left'} gap={'10px'} style={{ margin: '10px' }}>
          <Checkbox
            label={'마감일 변경하기'}
            checked={hasDeadline}
            onChange={(event) => {
              setHasDeadline(event.target.checked);
              sendLog(LogEvents.NoticeWritingPageCheckDeadline, {
                checked: event.target.checked,
              });
            }}
          />

          {hasDeadline && deadline && (
            <DateInput
              type={'date'}
              value={deadline}
              onChange={(event) => {
                setDeadline(event.target.value);
                sendLog(LogEvents.NoticeWritingPageSetDeadline, {
                  deadline: event.target.value,
                });
              }}
              onKeyDown={(event) => {
                event.preventDefault();
              }}
              onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                // @ts-ignore
                event.target.showPicker();
              }}
            />
          )}
        </Flex>
        <Flex>
          <Input
            name={'searchQuery'}
            placeholder="여기에 추가 공지를 입력하세요"
            color={colorSet.text}
            font-size={'1.5rem'}
            style={{
              flexGrow: 1,
              lineHeight: '1.5rem',
            }}
          />
        </Flex>

        <AddNoticeRadio
          checked={hasDeadline}
          onChange={(event) => {
            setHasDeadline(event.target.checked);
            sendLog(LogEvents.NoticeWritingPageCheckDeadline, {
              checked: event.target.checked,
            });
          }}
        />
        <Flex justifyContent={'center'} gap={'10px'}>
          <Button
            width={'133px'}
            height={'40px'}
            color={colorSet.secondaryText}
            variant={ButtonVariant.contained}
          >
            <Text font={Font.Medium}>취소하기</Text>
          </Button>
          <Button
            width={'133px'}
            height={'40px'}
            color={colorSet.primary}
            variant={ButtonVariant.contained}
          >
            <Text font={Font.Medium}>제출하기</Text>
          </Button>
        </Flex>
      </BorderBox>
    </div>
  );
};

export default AddAddtionalNotice;
